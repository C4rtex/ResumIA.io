using System;
using ApiGPT.Modelos;
using ApiGPT.Services;
using Microsoft.AspNetCore.Mvc;
using OpenAI;
using OpenAI.Managers;
using OpenAI.ObjectModels;
using OpenAI.ObjectModels.RequestModels;
using OpenAI_API.Chat;

namespace ApiGPT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GPTController:ControllerBase
	{
        private readonly IGPTService service;

        public GPTController    (IGPTService service)
		{
            this.service = service;
        }

        [HttpPost(Name = "GetGPT")]
        public async Task<IActionResult> getAbstract(CallGPTViewModel callGPTViewModel)
        {
            var response = await service.getAbstract(callGPTViewModel);
            return Ok(response);
    	}
	}
}

