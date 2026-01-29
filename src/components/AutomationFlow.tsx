'use client';

import React, { useMemo } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    Edge,
    Node,
    Position,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface FlowchartProps {
    nodes?: Node[];
    edges?: Edge[];
}

const defaultNodes: Node[] = [
    {
        id: '1',
        data: { label: '🏦 Bank OFX Request' },
        position: { x: 250, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: '🔍 Parse Transaction Data' },
        position: { x: 250, y: 100 },
    },
    {
        id: '3',
        data: { label: '📁 Generate CSV Report' },
        position: { x: 100, y: 200 },
    },
    {
        id: '4',
        data: { label: '📤 Upload to Hostinger' },
        position: { x: 400, y: 200 },
    },
    {
        id: '5',
        data: { label: '✅ Task Complete' },
        position: { x: 250, y: 300 },
        type: 'output',
    },
];

const defaultEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e3-5', source: '3', target: '5' },
    { id: 'e4-5', source: '4', target: '5' },
];

export default function AutomationFlow({ nodes = defaultNodes, edges = defaultEdges }: FlowchartProps) {
    return (
        <div className="w-full h-[500px] glass rounded-3xl overflow-hidden neon-border-blue relative">
            <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-bold tracking-widest text-neon-blue uppercase bg-black/50 px-2 py-1 rounded border border-neon-blue/20">
                    Live Workflow Visualizer
                </span>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                colorMode="dark"
                className="bg-black/20"
            >
                <Background
                    variant={BackgroundVariant.Lines}
                    color="#00f2ff20"
                    gap={20}
                />
                <Controls className="bg-black/50 border-white/10 fill-white" />
            </ReactFlow>
        </div>
    );
}
