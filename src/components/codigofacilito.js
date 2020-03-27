import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default () => {
    const data = useStaticQuery(graphql `{
        codigofacilitoJson {
            data {
                courses {
                    title
                    progress
                    url
                }
            }
        }
    }`);

    return(
        <section>
            <div className="my-24">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center">Mis Certificados online en CódigoFacilito</h2>
                        <div className="flex mt-8">
                            {
                                data.codigofacilitoJson.data.courses.map(courses =>(
                                    <div className="shadow p-8 bg-white mr-4 rounded">
                                        <a href={courses.url} target="_blank" rel="noopener noreferrer"><h4 className="font-bold"> {courses.title}</h4></a>
                                        <div>
                                            <span className="inline-block bg-orange-200 text-orange-400 p-2 mt-2 radius">Progreso: {parseInt(courses.progress)} %</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                </div>
            </div>
        </section>
    );
}