namespace Engine.Modules;

public interface IEngineModule
{
    public int Priority { get; }
    public void Initialize();
}