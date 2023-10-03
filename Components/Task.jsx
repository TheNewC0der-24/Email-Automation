import { useState } from 'react';
import { Handle, Position } from "reactflow";

import { Box, TextField, Button } from '@mui/material';

import { useSelector, useDispatch } from "react-redux";
import { setNodes, updateNodeValue } from "../Redux/nodes";

export default function Task({ id }) {
    const initialNodes = useSelector((state) => state.nodes.nodes);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    return (
        <>
            <Handle type="target" position={Position.Top} />

            <Box
                sx={{
                    p: 2,
                    backgroundColor: "#080e0e",
                    borderRadius: "8px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                }}
            >
                <TextField
                    size="small"
                    sx={{
                        mt: 0.5,
                        "& .MuiOutlinedInput-root": {
                            bgcolor: "#fff",
                            "& fieldset": {
                                border: "none",
                            },
                        },
                    }}
                    placeholder='Enter task'
                    type='text'
                    required
                    onChange={(e) => {
                        setValue(e.target.value);
                        dispatch(updateNodeValue({ id, value: e.target.value }));
                    }}
                    value={value}
                />
                {Number(id) === initialNodes.length && (
                    <Button
                        variant="contained"
                        color='success'
                        onClick={() => dispatch(setNodes())}
                    >
                        ADD NODE
                    </Button>
                )}
            </Box>

            <Handle type='source' position={Position.Bottom} id='a' />
        </>
    )
}
