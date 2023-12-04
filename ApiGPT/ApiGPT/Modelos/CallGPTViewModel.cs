using System;
using System.ComponentModel.DataAnnotations;

namespace ApiGPT.Modelos
{
	public class CallGPTViewModel
	{
		[Required]
		public string Text { get; set; }
		[Required]
		[Range(1,3)]
		public int Language { get; set; }
		public CallGPTViewModel()
		{
		}
	}
}
