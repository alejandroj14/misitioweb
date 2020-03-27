import React, {useEffect, useState} from "react";
import Repo from './repo';

export default () => {
    const [repos, setRepos] = useState([]);
    const [reposCount, setReposCount] = useState([]);

    useEffect(()=>{

        const data =sessionStorage.getItem("repos");
        let myRepos;

        if(data){
            myRepos = JSON.parse(data);
            setReposCount(myRepos.length);
            myRepos = myRepos.slice(0,12);
            return setRepos(myRepos);
        }

        async function fetchRepos(){
            const response = await fetch("https://api.github.com/users/alej36/repos");
            myRepos = await response.json();
            setReposCount(myRepos.length);
            sessionStorage.setItem("repos", JSON.stringify(myRepos));
            myRepos = myRepos.slice(0,12);
            setRepos(myRepos);
        }

        fetchRepos();
    },[]);

    return (
        <div className="max-w-4xl mx-auto my-12">
            <header className="text-center">
                <h2 className="text-3xl font-bold">Mi repositorios de github</h2>
                <p>Colaboraciones y contribuciones</p>
            </header>
            <ul className="repos-list">
                {
                    repos.map((repo) =>{
                        return <Repo repo={repo} key={repo.id} />
                    })
                }
            </ul>
            <div className="mt-8 text-center">
                <a href="https://github.com/alej36" className="btn" target="_blank" rel="noopener noreferrer">Ver más en github ({reposCount}) </a>
            </div>
        </div>
    )
}