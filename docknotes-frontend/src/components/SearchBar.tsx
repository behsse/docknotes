import { Search } from 'lucide-react';

export const SearchBar = () => {
    return (
        <div className='flex bg-zinc-300 rounded-full w-[70%] py-3 px-6 gap-4'>
            <Search className='w-7 h-7'/>
            <input type="text" placeholder='Search' className='placeholder:text-black placeholder:text-lg w-full outline-none'/>
        </div>
    )
}
