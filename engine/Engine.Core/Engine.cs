using System.Reflection;
using Engine.Modules;

namespace Engine.Core;

public class Engine
{
    private readonly List<IEngineModule> _modules;
    
    public Engine(EngineManifest manifest)
    {
        _modules = new List<IEngineModule>();
        
        for (int index = 0, count = manifest.Modules.Count; index < count; ++index)
        {
            var info = manifest.Modules[index];
            
            var dll = Assembly.LoadFrom(info.DLL);
            
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

    public void Run()
    {
        for (int index = 0, count = _modules.Count; index < count; ++index)
        {
            var module = _modules[index];
            
            module.Initialize();
        }
    }
}