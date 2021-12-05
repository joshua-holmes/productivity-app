import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';





function ListItemContainer( { data, handleRemove } ){
    return (
        <ListItem
        secondaryAction={
          <IconButton onClick={() => handleRemove(data)} edge="end" aria-label="delete">
            <DeleteIcon  />
          </IconButton>
        }>
            {data}
        </ListItem>
        
    )
}

export default ListItemContainer