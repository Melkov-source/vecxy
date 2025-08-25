using Math;
using Graphics;

namespace UI;

public class UIElement
{
    public Vector2 Size;
    public Vector2 Position;
    public UIElementStyle Style;
}

public struct UIElementStyle
{
    public Color Color { get; set; }
    public UIBorder Border { get; set; }
}

public struct UIBorder
{
    public float Radius { get; set; }
    public float Thickness { get; set; }
    public Color Color { get; set; }
}

