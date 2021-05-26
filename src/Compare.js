import React, { Component } from 'react';

class CompareScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            compare_data: []
        }
    }

    add_to_compare_table = (item, index) => {
        let dataCopy = this.state.data
        dataCopy[index]['compare'] = true
        let compare_dataCopy = this.state.compare_data
        compare_dataCopy.push(item)
        this.setState({ compare_data: compare_dataCopy, data: dataCopy })
    }

    remove_from_compare_table = (item, index) => {
        let dataCopy = this.state.data
        dataCopy[index]['compare'] = false
        let compare_dataCopy = this.state.compare_data
        var deleted_data = compare_dataCopy.filter(row => row['id'] !== item['id'])
        this.setState({ compare_data: deleted_data, data: dataCopy })
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/photos',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            }).then(response => {
                return response.json();
            })
            .then((Response) => {
                console.log(JSON.stringify(Response))
                this.setState({ data: Response.slice(0, 18) })
            })

    }


    render() {

        return (
            <div className="container">
                <div className="row">
                    {
                        this.state.data.map((item, index) =>
                            <div style={{ padding: '5px', paddingRight: '5px' }} key={index} className="col-md-2">
                                <div class="card" >
                                    <img src={item['url']} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        {
                                            !item['compare'] ?
                                                <a onClick={() => this.add_to_compare_table(item, index)} className="white btn btn-primary">COMPARE</a>
                                                :
                                                <a onClick={() => this.remove_from_compare_table(item, index)} className="white btn btn-primary">REMOVE</a>

                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <br />
                <h3 style={{ textAlign: 'center' }}>COMPARISON TABLE</h3>
                <div className="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Photo</th>
                                <th scope="col">ID</th>
                                <th scope="col">URL</th>
                                <th scope="col">Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.compare_data.map((item, index) =>
                                    <tr>
                                        <th scope="row">
                                            <img src={item.thumbnailUrl} />
                                        </th>
                                        <td>{item['id']}</td>
                                        <td>{item['url']}</td>
                                        <td>{item['title']}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div >
            </div>
        )
    }
}

export default CompareScreen;
