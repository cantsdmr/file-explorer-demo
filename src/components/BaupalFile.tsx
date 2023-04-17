import { Grid, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import { MouseEvent } from 'react';

type Props = {
    file?: BaupalFileType
    selected?: boolean
    onSelect(file: BaupalFileType): void
    onDelete(file: BaupalFileType): void
}

export enum FileKind {
    RegularFile,
    Folder
}

export interface BaupalFileType {
    id: string
    name: string
    type: FileKind
    path: string
    parentFile?: BaupalFileType
    subFiles?: BaupalFileType[]
}

const getFileIcon = (kind: FileKind) => {
    return kind === FileKind.Folder ? <FolderIcon /> : < InsertDriveFileIcon />
}

const BaupalFile = (props: Props) => {
    const { file = {} as BaupalFileType, selected, onSelect, onDelete } = props

    const handleFileClick = () => {
        onSelect(file)
    }

    const handleDelete = (e: MouseEvent) => {
        e.stopPropagation()
        onDelete(file)
    }

    return (
        <Grid>
            <ListItemButton
                selected={selected}
                onClick={handleFileClick}
            >
                <ListItemIcon>
                    {getFileIcon(file.type)}
                </ListItemIcon>
                <ListItemText primary={file?.name} />
                <ListItemIcon>
                    <CloseIcon onClick={handleDelete} color={'error'} fontSize='small' />
                </ListItemIcon>
            </ListItemButton>
        </Grid>
    );
}

export default BaupalFile