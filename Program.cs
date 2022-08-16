var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

//app.MapGet("/", Microsoft.AspNetCore.Mvc.ControllerBase.Url.Page());

app.Run();
