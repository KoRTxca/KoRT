import React from 'react';

// Logic: Map through academy_progress table
// If completed === true -> Node glows Gold (#c9a84c)
// If completed === false -> Node is Dim Blue (#0033a0)
// On click -> Launch Merlin-Local Lesson (DeepSeek R1 powered)

export function AcademyMap({ progressData = [] }) {
  // Placeholder mock data for the constellation nodes
  const nodes = [
    { id: 'lesson_1', title: 'The Fiat Illusion', x: 20, y: 30, completed: true },
    { id: 'lesson_2', title: 'Sovereign Wealth', x: 40, y: 50, completed: false },
    { id: 'lesson_3', title: 'Digital Dollars', x: 60, y: 20, completed: false },
    { id: 'lesson_4', title: 'Legal Shields', x: 80, y: 60, completed: false },
  ];

  const handleNodeClick = (lessonId) => {
    console.log(`Initiating DeepSeek R1 local lesson protocol for: ${lessonId}`);
    // Future integration: Open WebUI / Merlin Local bridge
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', background: 'rgba(10,10,26,0.8)', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.3)', overflow: 'hidden' }}>
      <h3 style={{ position: 'absolute', top: 20, left: 20, fontFamily: "'Cinzel', serif", color: '#e8d5a3', margin: 0 }}>Sovereign Learning Constellation</h3>
      
      {/* SVG Connecting Lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const nextNode = nodes[i + 1];
          return (
            <line 
              key={`line-${node.id}`}
              x1={`${node.x}%`} y1={`${node.y}%`} 
              x2={`${nextNode.x}%`} y2={`${nextNode.y}%`} 
              stroke={node.completed ? "rgba(201,168,76,0.5)" : "rgba(0,51,160,0.3)"} 
              strokeWidth="2"
              strokeDasharray={node.completed ? "none" : "4 4"}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map(node => {
        // Find if this node is completed in actual DB progress (if passed in)
        const dbRecord = progressData.find(p => p.lesson_id === node.id);
        const isCompleted = dbRecord ? dbRecord.completed : node.completed;
        
        return (
          <div 
            key={node.id}
            onClick={() => handleNodeClick(node.id)}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div style={{
              width: isCompleted ? '24px' : '16px',
              height: isCompleted ? '24px' : '16px',
              borderRadius: '50%',
              background: isCompleted ? '#c9a84c' : '#0033a0',
              boxShadow: isCompleted ? '0 0 20px #c9a84c' : '0 0 10px #0033a0',
              border: isCompleted ? '2px solid #fff' : '2px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }} />
            <span style={{
              color: isCompleted ? '#e8d5a3' : '#64748b',
              fontSize: '11px',
              fontWeight: isCompleted ? 700 : 400,
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: isCompleted ? '0 0 10px rgba(201,168,76,0.5)' : 'none'
            }}>
              {node.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
