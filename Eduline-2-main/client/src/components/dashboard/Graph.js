import React, {Fragment, useState, useEffect} from 'react';
import {Line, Bar} from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Graph = ({student}) => {
    const [chartData, setChartData] = useState([]);

    const chart = () => {
        const studentData = [];
        const jan = [0];
        const feb = [0];
        const mar = [0];
        const apr = [0];
        const may = [0];
        const jun = [0];
        const jul = [0];
        const aug = [0];
        const sep = [0];
        const oct = [0];
        const nov = [0];
        const dec = [0];
    
        student.forEach(pat => {
            if(new Date(pat.date).getMonth() === 0) {
                return jan.push(jan[0]+1);
            } else if(new Date(pat.date).getMonth() === 1) {
                return feb.push(feb[0]+1); 
            } else if(new Date(pat.date).getMonth() === 2) {
                return mar.push(mar[0]+1);
            } else if(new Date(pat.date).getMonth() === 3) {
                return apr.push(apr[0]+1);
            } else if(new Date(pat.date).getMonth() === 4) {
                return may.push(may[0]+1);
            } else if(new Date(pat.date).getMonth() === 5) {
                return jun.push(jun[0]+1);
            } else if(new Date(pat.date).getMonth() === 6) {
                return jul.push(jul[0]+1);
            } else if(new Date(pat.date).getMonth() === 7) {
                return aug.push(aug[0]+1);
            } else if(new Date(pat.date).getMonth() === 8) {
                return sep.push(sep[0]+1);
            } else if(new Date(pat.date).getMonth() === 9) {
                return oct.push(oct[0]+1);
            } else if(new Date(pat.date).getMonth() === 10) {
                return nov.push(nov[0]+1);
            } else if(new Date(pat.date).getMonth() === 11) {
                return dec.push(dec[0]+1);
            } else {
            }
        });
    
        var janData = jan.reduce( (a, b) => a+b, jan[0]);
        var febData = feb.reduce( (a, b) => a+b, feb[0]);
        var marData = mar.reduce( (a, b) => a+b, mar[0]);
        var aprData = apr.reduce( (a, b) => a+b, apr[0]);
        var mayData = may.reduce( (a, b) => a+b, may[0]);
        var junData = jun.reduce( (a, b) => a+b, jun[0]);
        var julData = jul.reduce( (a, b) => a+b, jul[0]);
        var augData = aug.reduce( (a, b) => a+b, aug[0]);
        var sepData = sep.reduce( (a, b) => a+b, sep[0]);
        var octData = oct.reduce( (a, b) => a+b, oct[0]);
        var novData = nov.reduce( (a, b) => a+b, nov[0]);
        var decData = dec.reduce( (a, b) => a+b, dec[0]);
    
        studentData.push(janData);
        studentData.push(febData);
        studentData.push(marData);
        studentData.push(aprData);
        studentData.push(mayData);
        studentData.push(junData);
        studentData.push(julData);
        studentData.push(augData);
        studentData.push(sepData);
        studentData.push(octData);
        studentData.push(novData);
        studentData.push(decData);
    
        console.log(studentData);
    
        setChartData({
            labels: [
                    "January", 
                    "February", 
                    "March", 
                    "April", 
                    "May", 
                    "June", 
                    "July", 
                    "August", 
                    "September", 
                    "October", 
                    "November", 
                    "December"
                ],
            datasets: [
                {
                    label: "level of students",
                    data: studentData,
                    borderColor: [
                        "#17a2b8"
                    ],
                    pointBorderColor: [
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                    ],
                    borderWidth: 3
                }
            ]
        }); 
    };
    useEffect(() => {
        chart();
    }, []);

    return (
        <Fragment>
            <div className="user-graph">
                            <Line
                                data={chartData}
                                options={{
                                    title: { text: "APPOINTMENTS PER MONTHS", display: true },
                                    labels: {
                                        "fontColor": "#f4f4f4",
                                        "fontWeight": "bold",
                                    },
                                    scales: {
                                    yAxes: [
                                        {
                                        ticks: {
                                            autoSkip: true,
                                            maxTicksLimit: 10,
                                            beginAtZero: true
                                        },
                                        gridLines: {
                                            display: false
                                        }
                                        }
                                    ],
                                    xAxes: [
                                        {
                                        gridLines: {
                                            display: false
                                        }
                                        }
                                    ]
                                    }
                                }}
                            />
                        </div>
        </Fragment>
    );
};

Graph.propTypes = {
    student: PropTypes.array.isRequired,
}

export default Graph;
