using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class Project
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public List<TaskItem> Tasks { get; set; }
    }

    public class TaskItem
    {
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }
        
        public string Status { get; set; } // e.g., "To Do", "In Progress", "Done"
        
        public int ProjectId { get; set; }
        
        [System.Text.Json.Serialization.JsonIgnore]
        public Project Project { get; set; }
    }

    public record ProjectDto(string Name, DateTime StartDate, DateTime EndDate);
    
    public record TaskDto(string Title, string Status);
}