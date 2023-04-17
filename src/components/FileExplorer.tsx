import { useState } from 'react'
import { Container, Divider, Stack } from '@mui/material';
import { BaupalFileType, FileKind } from './BaupalFile';
import FileColumn, { BaupalFileColumn } from './FileColumn';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    path: string
    onPathChange(path: string): void
}

const rootFile = {
    id: uuidv4(),
    name: 'root',
    path: '/',
    type: FileKind.Folder,
    subFiles: []
} as BaupalFileType

const rootColumn = {
    file: rootFile,
    depth: 0
} as BaupalFileColumn

const FileExplorer = (props: Props) => {
    const [viewColumns, setViewColumns] = useState([rootColumn]);
    const [selectedFile, setSelectedFile] = useState<BaupalFileType | null>(rootFile);

    const handleFileSelection = (depth: number, file?: BaupalFileType) => {
        const newDepth = depth + 1

        if (depth !== viewColumns.length) {
            const newColumns = [
                ...viewColumns.slice(0, newDepth),
                {
                    depth: newDepth,
                    file: file
                }
            ] as BaupalFileColumn[]
            setViewColumns(newColumns)
        } else {
            const newColumns = [
                ...viewColumns,
                {
                    depth: newDepth,
                    file: file
                }
            ] as BaupalFileColumn[]
            setViewColumns(newColumns)
        }

        props.onPathChange(file?.path as any)
        setSelectedFile(file as any)
    }

    const handleNewItem = (depth: number, newFile?: BaupalFileType) => {
        if (!newFile) {
            return
        }

        newFile.parentFile?.subFiles?.push(newFile)
        handleFileSelection(depth, newFile)
    }

    const handleDeletedItem = (depth: number, file?: BaupalFileType) => {
        if (!file) {
            return
        }

        const parentFile = file.parentFile
        const fileIndex = parentFile?.subFiles?.findIndex(f => f.id === file.id) ?? -1

        if (fileIndex >= 0) {
            file.parentFile?.subFiles?.splice(fileIndex, 1)
            handleFileSelection(depth - 1, parentFile)
        }
    }

    return (
        <Container>
            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                {viewColumns?.map((column, index: number) => {
                    return <FileColumn
                        key={index}
                        depth={column.depth}
                        file={column.file}
                        selectedFile={selectedFile}
                        onFileSelect={(file) => handleFileSelection(column.depth, file)}
                        onItemAddition={(file) => handleNewItem(column.depth, file)}
                        onItemDeletion={(file) => handleDeletedItem(column.depth, file)} />
                }
                )}
            </Stack>
        </Container>
    )
}

export default FileExplorer as any