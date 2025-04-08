using BackEnd.Data;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/projects", async (ProjectDto dto, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return Results.BadRequest("Project name is required.");

            var project = new Project
            {
                Name = dto.Name,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Tasks = new List<TaskItem>()
            };

            db.Projects.Add(project);
            await db.SaveChangesAsync();

            return Results.Created($"/api/projects/{project.Id}", project);
        });

        app.MapPost("/reset", async (AppDbContext db) =>
        {
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();
            return Results.Ok("Database reset");
        });


        app.MapGet("/api/projects", async (AppDbContext db) =>
            await db.Projects.Include(p => p.Tasks).ToListAsync());

        app.MapPost("/api/projects/{projectId}/tasks", async (int projectId, TaskDto dto, AppDbContext db) =>
        {
            var project = await db.Projects.FindAsync(projectId);
            if (project == null)
                return Results.NotFound($"Project with ID {projectId} not found.");

            var task = new TaskItem
            {
                Title = dto.Title,
                Status = dto.Status,
                ProjectId = projectId
            };

            db.Tasks.Add(task);
            await db.SaveChangesAsync();

            return Results.Created($"/api/projects/{projectId}/tasks/{task.Id}", task);
        });
    }
}
