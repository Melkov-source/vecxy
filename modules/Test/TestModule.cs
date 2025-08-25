using Engine.Modules;
using GG;

namespace Test;

public class TestModule : IEngineModule
{
    public int Priority => 100;
    
    public void Initialize()
    {
        var gg = new GG_CLASS();
        gg.Test();
        
        Console.WriteLine("TestModule.Initialize");
    }
}