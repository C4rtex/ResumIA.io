using System;
using ApiGPT.Modelos;

namespace ApiGPT.Services
{
	public interface IGPTService
	{
        Task<string> getAbstract(CallGPTViewModel callGPTViewModel);
    }
}

