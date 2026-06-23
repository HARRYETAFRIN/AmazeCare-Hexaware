using AmazeCare.DTO;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Text.Json;

namespace AmazeCare.Middleware
{
    public class GlobalExceptionMiddleware
    {

        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public GlobalExceptionMiddleware(RequestDelegate next,
            ILogger<GlobalExceptionMiddleware> logger,
            IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context,Exception exception)
        {
            _logger.LogError(exception, exception.Message);

            context.Response.ContentType = "application/json";

            ApiErrorResponseDto response;

            switch (exception)
            {
                case KeyNotFoundException:

                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;

                    response = new ApiErrorResponseDto
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = "Resource not found",
                        ErrorType = "NotFoundError",
                        Details = _env.IsDevelopment()
                            ? exception.Message
                            : null
                    };
                    break;

                case ArgumentException:

                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                    response = new ApiErrorResponseDto
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = "Invalid input provided",
                        ErrorType = "ValidationError",
                        Details = _env.IsDevelopment()
                            ? exception.Message
                            : null
                    };
                    break;

                case DbUpdateException:

                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                    response = new ApiErrorResponseDto
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = "Database operation failed",
                        ErrorType = "DatabaseError",
                        Details = _env.IsDevelopment()
                            ? exception.Message
                            : null
                    };
                    break;

                default:

                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                    response = new ApiErrorResponseDto
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = "An unexpected error occurred",
                        ErrorType = "ServerError",
                        Details = _env.IsDevelopment()
                            ? exception.Message
                            : null
                    };
                    break;
            }

            var json = JsonSerializer.Serialize(response);

            await context.Response.WriteAsync(json);
        }
    }
}

