using BackEnd.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// --- Configuration ---
var configuration = builder.Configuration;
var env = builder.Environment;

// --- Force HTTP-only and dynamic port for Render ---
/* builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(int.Parse(Environment.GetEnvironmentVariable("PORT") ?? "8080"));
});
 */

// --- Services ---
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5070",
            "http://localhost:5072",
            "https://filipeansilva.github.io"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// --- Apply Migrations at Startup ---
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
    dbContext.Database.EnsureCreated(); // Cria se não existir

    try
    {
        dbContext.Database.Migrate(); // Aplica migrações
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred while applying migrations: {ex.Message}");
    }
}

// --- Middleware ---
    app.UseSwagger();
    app.UseSwaggerUI();
if (env.IsDevelopment())
{
    
    // Apenas em local
    app.UseHttpsRedirection();
}
else
{
    Console.WriteLine("Running in production — HTTPS redirection is disabled.");
}

app.UseCors("AllowFrontend");

// --- Endpoints ---
app.MapProjectEndpoints();

app.Run();
