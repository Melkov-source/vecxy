using System.Reflection;
using Engine.Modules;

namespace Core;

public static class Program
{
    private static readonly List<IEngineModule> _modules = new();
    
    public static void Main(string[] args)
    {
        var modules = new List<string>
        {
            @"D:\Projects\vecxy\modules\Test\bin\Debug\net6.0\Test.dll",
        };
        
        for (int index = 0, count = modules.Count; index < count; ++index)
        {
            var path = modules[index];
            
            var dll = Assembly.LoadFrom(path);
            
            var type = dll
                .GetTypes()
                .First(type => typeof(IEngineModule).IsAssignableFrom(type) && type.IsInterface == false);

            try
            {
                var module = Activator.CreateInstance(type) as IEngineModule;

                if (module == null)
                {
                    throw new Exception($"Failed to create module of type: {type}");
                }
                
                module.Initialize();
                
                _modules.Add(module);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        
        _modules.Sort((m1 , m2) => m1.Priority - m2.Priority);
    }
}