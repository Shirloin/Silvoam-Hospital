export default function Search({onSearch}: any){

    const handleSearch = (e:any) =>{
        e.preventDefault();
        onSearch(e.target.value)
    }

    return (
        <input type="text" placeholder="Search"onChange={handleSearch}className="rounded-full px-5 py-2 w-64 lg:w-80 xl:w-[400px] border-2 focus:outline-none focus:shadow-outline"/>
    );
}