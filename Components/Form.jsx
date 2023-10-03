import React, { useState, useCallback, useMemo, useEffect } from 'react';

import { Box, InputLabel, TextField, Button } from '@mui/material';

import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Background,
} from "reactflow";
import "reactflow/dist/style.css";

import Task from './Task';

import { useSelector } from "react-redux";

const Form = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');

    const initialNodes = useSelector((state) => state.nodes.nodes);
    const initialEdges = useSelector((state) => state.nodes.edges);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const nodeTypes = useMemo(() => ({ task: Task }), []);

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [initialNodes, setNodes, initialEdges, setEdges]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const sendEmail = (index) => {
        fetch("/api/send", {
            method: "POST",
            body: JSON.stringify({
                email,
                subject,
                tasks: nodes
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((data) => {
                alert(`Sent to processing`);
            })
            .catch((err) => {
                alert(`Encountered an error when message${index} ❌`);
                console.error(err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendEmail();
        setEmail('');
        setSubject('');
    }

    return (
        <Box mt={3}>
            <form onSubmit={handleSubmit}>
                <Box mb={3}>
                    <InputLabel sx={{ color: "#dee2e6" }} htmlFor="email">Email</InputLabel>
                    <TextField
                        size="small"
                        fullWidth
                        sx={{
                            mt: 0.5,
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "#fff",
                                "& fieldset": {
                                    border: "none",
                                },
                            },
                        }}
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box mb={3}>
                    <InputLabel sx={{ color: "#dee2e6" }} htmlFor="subject">Subject</InputLabel>
                    <TextField
                        size="small"
                        fullWidth
                        sx={{
                            mt: 0.5,
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "#fff",
                                "& fieldset": {
                                    border: "none",
                                },
                            },
                        }}
                        placeholder="Enter subject here"
                        type='text'
                        name="subject"
                        id="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </Box>

                <Box mb={2} sx={{ height: "50vh", width: "100%" }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                    >
                        <Controls />
                        <MiniMap />
                        <Background variant="dots" gap={12} size={1} />
                    </ReactFlow>
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#6d2ae2",
                        "&:hover": {
                            backgroundColor: "#6d2ae2",
                        },
                    }}
                >
                    Start Automation
                </Button>
            </form>
        </Box>
    )
}

export default Form;
