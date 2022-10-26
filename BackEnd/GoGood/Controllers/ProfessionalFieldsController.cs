using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGood.Models;

namespace GoGood.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessionalFieldsController : ControllerBase
    {
        private readonly GoGoodContext _context;
        private readonly ILogger<ProfessionalFieldsController> _logger;

        public ProfessionalFieldsController(GoGoodContext context,
                                        ILogger<ProfessionalFieldsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/ProfessionalFields
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfessionalField>>> GetProfessionalFields()
        {
            return await _context.ProfessionalFields.ToListAsync();
        }

        // POST: api/ProfessionalFields/ss
        [HttpPost("ss")]
        public async Task<ActionResult<ProfessionalField[]>> PostProfessionalFields(ProfessionalField[] professionalFields)
        {
            if (professionalFields == null)
            {
                return BadRequest();
            }

            try
            {
                _context.ProfessionalFields.AddRange(professionalFields);

                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw e;
            }

            return professionalFields;

        }
    }
}