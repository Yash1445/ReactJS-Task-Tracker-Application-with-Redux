import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '../ui/Input';
import { useDebounce } from '../../hooks/useDebounce';
import { setSearch } from '../../features/tasks/tasksSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const debounced = useDebounce(value, 350);

  useEffect(() => {
    dispatch(setSearch(debounced));
  }, [debounced, dispatch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  return <Input placeholder="Search by title or description" value={value} onChange={onChange} />;
};