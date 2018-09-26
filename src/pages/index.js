import React, { Fragment, Component } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import { Collapse } from 'reactstrap';
import { FireApp } from '../database/firebase';

const Firestore = FireApp.firestore();
Firestore.settings({ timestampsInSnapshots: true });

class IndexPage extends Component {
  state = {
    photos: [],
    categories: [],
    formOpen: true,
    newPhoto: { title: '', url: '' }
  }

  componentDidMount() {
    Firestore.collection('photos')
      .onSnapshot(snap => {
        this.setState({
          photos: snap.docs.map(x => {
            return {
              ...x.data(),
              id: x.id
            }
          })
        })
      })
  }

  handleChange = e => {
    this.setState({
      newPhoto: {
        ...this.state.newPhoto,
        [e.target.name]: e.target.value
      }
    })
  }

  handleDeletePhoto = id => {
    Firestore
      .collection('photos')
      .doc(id).delete();
  }

  handleSubmit = e => {
    e.preventDefault();

    Firestore
      .collection('photos')
      .add(this.state.newPhoto)
      .then(ref => {
        this.setState({
          newPhoto: {title: '', url: ''}
        })
      })

  }

  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-md-12">
            <Collapse isOpen={this.state.formOpen}>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text"
                    name="title"
                    onChange={this.handleChange}
                    placeholder="Title"
                    value={this.state.newPhoto.title}
                    className="form-control" />
                </div>

                <div className="form-group">
                  <input type="text"
                    name="url"
                    onChange={this.handleChange}
                    placeholder="Url of the photo"
                    value={this.state.newPhoto.url}
                    className="form-control" />
                </div>

                <div className="form-group">
                  <button className="btn btn-success">
                    Submit
                </button>
                </div>
              </form>
            </Collapse>
          </div>
          <div className="col-md-12">
            <section>
              <div className="row">
                {
                  this.state.photos.map(photo => (
                    <div key={photo.id} className="col-md-3">
                      <img src={photo.url} />
                      <p>{photo.title}</p>
                      <button
                        onClick={() => this.handleDeletePhoto(photo.id)}
                        className="btn btn-danger btn-sm">
                        Delete
                      </button>
                    </div>
                  ))
                }

              </div>

            </section>
          </div>
        </div>
      </Layout>
    );
  }
}

export default IndexPage
