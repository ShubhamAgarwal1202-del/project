using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/report/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateReport([FromBody] Report report)
        {
            report.Timestamp = DateTime.UtcNow;
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();
            return Ok("User reported successfully.");
        }

        // GET: api/report/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllReports()
        {
            var reports = await _context.Reports
                .OrderByDescending(r => r.Timestamp)
                .ToListAsync();
            return Ok(reports);
        }

        // DELETE: api/report/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null) return NotFound("Report not found.");

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();
            return Ok("Report deleted.");
        }
    }
}