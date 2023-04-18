import { List, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid';

import BaupalFile, { BaupalFileType, FileKind } from './BaupalFile'
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useState } from 'react';
import InputModal from './InputModal';

export interface BaupalFileColumn {
    file?: BaupalFileType
    depth: number
}

type Props = {
    depth: number
    file?: BaupalFileType
    selectedFile: BaupalFileType | null
    onFileSelect(file: BaupalFileType): void
    onItemAddition(file?: BaupalFileType): void
    onItemDeletion(file?: BaupalFileType): void
}

const actions = [
    { icon: <FolderIcon />, name: 'New Folder', type: FileKind.Folder },
    { icon: <InsertDriveFileIcon />, name: 'New File', type: FileKind.RegularFile },
];

const FileColumn = (props: Props) => {
    const { file, depth, selectedFile, onFileSelect, onItemAddition, onItemDeletion } = props

    const [showModal, setShowModal] = useState(false)
    const [inputValue, setInputValue] = useState({
        name: 'New Folder',
        type: FileKind.Folder
    })

    const handleFileSelection = (file: BaupalFileType) => {
        onFileSelect(file)
    }

    const handleItemAddition = (type: FileKind, name: string) => {
        setShowModal(true)
        setInputValue({
            name,
            type
        })
    }

    const completeItemAddition = (value: string) => {
        setShowModal(false)

        const pathName = value.split(' ').join('_').toLowerCase()
        const newItem = {
            id: uuidv4(),
            name: value,
            path: file?.path.concat(depth === 0 ? '' : '/', pathName),
            type: inputValue.type,
            parentFile: file,
            subFiles: []
        } as BaupalFileType
        onItemAddition(newItem)
    }

    const handleItemDeletion = (file?: BaupalFileType) => {
        onItemDeletion(file)
    }

    const getSpeedDial = () => {
        return <SpeedDial
            ariaLabel="SpeedDial"
            icon={<SpeedDialIcon />}

        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => handleItemAddition(action.type, action.name)}
                />
            ))}
        </SpeedDial>
    }

    const renderRegularFileContent = (file?: BaupalFileType) => {
        return <Stack>
            <p>Here is the file preview</p>
            <Typography>File name: {file?.name}</Typography>
            <Typography>File path: {file?.path ?? 'No path found'}</Typography>
        </Stack>
    }

    const renderSubFiles = (file?: BaupalFileType) => {
        if (file?.subFiles == null || file?.subFiles.length === 0) {
            return <p>Nothing to show. Please add item using Plus Button.</p>
        }

        return <List dense>
            {file?.subFiles?.sort(sortByName).map((sub, index) =>
                <BaupalFile
                    key={index}
                    file={sub}
                    selected={selectedFile?.id === sub.id}
                    onDelete={handleItemDeletion}
                    onSelect={handleFileSelection} />)}
        </List>
    }

    const renderActions = () => {
        return <div style={{ position: 'absolute', bottom: 16, right: 2 }}>
            {getSpeedDial()}
        </div>
    }

    const sortByName = (first: BaupalFileType, second: BaupalFileType) => {
        return first.name.toLowerCase() > second.name.toLowerCase() ? 1 : -1
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '75vh' }}>
            {file?.type === FileKind.Folder && <>
                {renderSubFiles(file)}
                {renderActions()}
            </>}
            {file?.type === FileKind.RegularFile && <>
                {renderRegularFileContent(file)}
            </>}

            {showModal && <InputModal
                openModal={showModal}
                defaultValue={inputValue.name}
                onClose={() => setShowModal(false)}
                onSave={(value) => completeItemAddition(value)} />}
        </div>
    )
}

export default FileColumn