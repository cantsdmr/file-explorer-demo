import { useState } from 'react'
import { Box, Input, Modal } from '@mui/material'
import { Button } from '@mui/material';

type Props = {
    defaultValue: string
    openModal: boolean
    onSave(value: string): void
    onClose(): void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const InputModal = (props: Props) => {
    const { defaultValue, openModal, onSave, onClose } = props
    const [inputValue, setInputValue] = useState(defaultValue);
    const handleSave = () => {
        onSave(inputValue)
    }

    return (<>
        <Modal
            open={openModal}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Input
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInputValue(e.target.value)}
                    value={inputValue}
                />
                <br />
                <br />
                <Button variant="contained" onClick={handleSave}>Create</Button>
            </Box>
        </Modal>
    </>

    )
}

export default InputModal