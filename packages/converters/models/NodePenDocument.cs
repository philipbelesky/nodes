using System;
using System.Collections.Generic;
using Speckle.Core.Models;
using Speckle.Newtonsoft.Json;
using Grasshopper.Kernel;
using Grasshopper.Kernel.Types;
using Grasshopper.Kernel.Data;
using Grasshopper.Kernel.Parameters;
using Objects.Geometry;

namespace NodePen.Converters
{

    public class NodePenDocument : Base
    {
        [JsonProperty("id")]
        public string Id { get; private set; } = Guid.NewGuid().ToString();

        [JsonProperty("nodes")]
        public Dictionary<string, NodePenDocumentNode> Nodes { get; set; } = new Dictionary<string, NodePenDocumentNode>();

        [JsonProperty("configuration")]
        public NodePenDocumentConfiguration Configuration { get; set; } = new NodePenDocumentConfiguration();

        [JsonProperty("version")]
        public int Version { get; private set; } = 1;

        public NodePenDocument() { }
    }

    public class NodePenDocumentConfiguration : Base
    {

        [JsonProperty("pinnedPorts")]
        public List<PinnedPortConfiguration> PinnedPorts { get; set; } = new List<PinnedPortConfiguration>();

    }

    public class PinnedPortConfiguration : Base
    {

        [JsonProperty("nodeInstanceId")]
        public string NodeInstanceId { get; set; }

        [JsonProperty("portInstanceId")]
        public string PortInstanceId { get; set; }

    }

    public class NodePenDocumentNode : Base
    {

        [JsonProperty("instanceId")]
        public string InstanceId { get; set; }

        [JsonProperty("templateId")]
        public string TemplateId { get; set; }

        [JsonProperty("position")]
        public NodePenDocumentNodePosition Position { get; set; } = new NodePenDocumentNodePosition();

        [JsonProperty("dimensions")]
        public NodePenDocumentNodeDimensions Dimensions { get; set; } = new NodePenDocumentNodeDimensions();

        [JsonProperty("anchors")]
        public Dictionary<string, NodePenDocumentNodeAnchor> Anchors { get; set; } = new Dictionary<string, NodePenDocumentNodeAnchor>();

        [JsonProperty("sources")]
        public Dictionary<string, List<NodePenPortReference>> Sources { get; set; } = new Dictionary<string, List<NodePenPortReference>>();

        [JsonProperty("inputs")]
        public Dictionary<string, int> Inputs { get; set; } = new Dictionary<string, int>();

        [JsonProperty("outputs")]
        public Dictionary<string, int> Outputs { get; set; } = new Dictionary<string, int>();

        [JsonProperty("values")]
        public Dictionary<string, NodePenDataTree> Values { get; set; } = new Dictionary<string, NodePenDataTree>();

        public NodePenDocumentNode()
        {

        }

    }

    public class NodePenDocumentNodePosition : Base
    {
        [JsonProperty("x")]
        public double X { get; set; } = 0;

        [JsonProperty("y")]
        public double Y { get; set; } = 0;
    }

    public class NodePenDocumentNodeDimensions : Base
    {
        [JsonProperty("width")]
        public double Width { get; set; } = 0;

        [JsonProperty("height")]
        public double Height { get; set; } = 0;
    }

    public class NodePenDocumentNodeAnchor : Base
    {
        [JsonProperty("dx")]
        public double Dx { get; set; } = 0;

        [JsonProperty("dy")]
        public double Dy { get; set; } = 0;
    }

    public class NodePenPortReference : Base
    {
        [JsonProperty("nodeInstanceId")]
        public string NodeInstanceId { get; set; }

        [JsonProperty("portInstanceId")]
        public string PortInstanceId { get; set; }
    }

    public class NodePenDataTree : Dictionary<string, List<NodePenDataTreeValue>>
    {

    }

    public class NodePenDataTreeValue : Base
    {

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("value")]
        public dynamic Value { get; set; }

        public double UnwrapAsDouble()
        {
            return Convert.ToDouble(this["Value"]);
        }

        public int UnwrapAsInteger()
        {
            return Convert.ToInt32(this["Value"]);
        }

    }

}