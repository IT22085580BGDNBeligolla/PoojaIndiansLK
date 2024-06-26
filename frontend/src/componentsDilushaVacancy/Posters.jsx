import React from 'react'
import Poster from './Poster';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAllData } from '../fetchPoster/fetchPoster';

const Posters = () => {
    

    const { data, isLoading, isError} = useQuery("poster", getAllData);

    console.log(data)

    const navigate = useNavigate();
    return (
        <div className="w-[80%] mx-auto my-[3rem] border-2 border-blue-100 shadow-md shadow-gray-400
        rounded-lg">
            <h1 className="p-6 text-center flex-1 text-2xl font-bold text-gray-700">Posters Application</h1>

            <div className="text-right mr-10">
                <button
                    onClick={() => navigate("/AddPoster")}
                    className="button text-sm px-4"
                >Add vacncy post</button>
            </div>

            {/* maping data*/}
            <div className="p-4 lg:p-7 flex items-center flex-wrap gap-5 w-[95%] mx-auto">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Something went wrong!!..</p>}
                {data?.length == 0  ? (<p>No Poster exist</p>
                ) : (
                    data?.map((poster, i) => <Poster poster={ poster } key={ i } />)
                )}
            </div>
        </div>
    )
}

export default Posters