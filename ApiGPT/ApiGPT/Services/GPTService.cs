using System;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using OpenAI_API.Chat;
using OpenAI;
using OpenAI.Managers;
using OpenAI.ObjectModels;
using OpenAI.ObjectModels.RequestModels;
using ApiGPT.Modelos;

namespace ApiGPT.Services
{
    public class GPTService : IGPTService
    {
        private static readonly string key = Environment.GetEnvironmentVariable("GPTKey");

        public GPTService()
        {
        }
        public async Task<string> getAbstract(CallGPTViewModel callGPTViewModel)
        {
            var language = (Language)callGPTViewModel.Language;
            var openAiService = new OpenAIService(new OpenAiOptions()
            {
                ApiKey = key,
            });
            var completionResult = await openAiService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
            {
                Messages = new List<OpenAI.ObjectModels.RequestModels.ChatMessage>
                {
                    new OpenAI.ObjectModels.RequestModels.ChatMessage(ChatMessageRole.Assistant, $"Tú eres un asistente que hace resumenes en el idioma {language.ToString().ToLower()} de la información que se te da o en caso de que creas que es una tabla crear un texto sobre su contenido dandole una explicación. No debes decir si quiero más información al final. Recuerda hacer el texto en el idioma {language.ToString().ToLower()}"),
                    new OpenAI.ObjectModels.RequestModels.ChatMessage(ChatMessageRole.User, callGPTViewModel.Text)
                },
                Model = Models.Gpt_3_5_Turbo_1106,
                MaxTokens = 1000,
                Temperature = 0.7f,
                TopP = 1,
                PresencePenalty = 0,
                FrequencyPenalty = 0,
            });

            if (completionResult.Successful)
            {
                return (completionResult.Choices.First().Message.Content);
            }
            return "No se pudo generar la respuesta";
        }
    }
}