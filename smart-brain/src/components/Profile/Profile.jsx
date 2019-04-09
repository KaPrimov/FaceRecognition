import React from 'react';
import './Profile.css'
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        }
    }

    onFormChange = (event) => {
        this.setState({ [event.target.name.replace("user-", "")]: event.target.value })
    }

    onProfileUpdate = (user) => {
        fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
             },
            body: JSON.stringify({ formInput: user })
        }).then(res => {
            if (res.status === 200 || res.status === 304) {
                this.props.toggleModal();
                this.props.loadUser({ ...this.props.user, ...user});
            }
        }).catch(console.error);
    }

    render() {
        const { toggleModal, user } = this.props;
        const { name, age, pet } = this.state;
        return (
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80">
                        <img src="http://tachyons.io/img/logo.jpg"
                            className="br-100 pa1 ba b--black-10 h3 w3" alt="avatar" />
                        <h1>{this.state.name}</h1>
                        <h4>Images submited: {user.entries}</h4>
                        <p>Memeber since: {new Date(user.joined).toLocaleDateString()}</p>
                        <hr />
                        <label className="mt2 fw6" htmlFor="user-name">Name: </label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            placeholder={user.name}
                            type="text"
                            name="user-name"
                            id="name"
                        />
                        <label className="mt2 fw6" htmlFor="user-age">Age: </label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            placeholder={user.age}
                            type="number"
                            name="user-age"
                            id="name"
                        />
                        <label className="mt2 fw6" htmlFor="user-pet">Pet: </label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            placeholder={user.pet || 'No pet set'}
                            type="text"
                            name="user-pet"
                            id="name"
                        />
                        <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <button className="b pa2 pointer hover-white w-40 bg-light-blue b--black-20"
                                onClick={() => this.onProfileUpdate({ name, age, pet })}>
                                Save
                            </button>
                            <button className="b pa2 pointer hover-white w-40 bg-light-red b--black-20"
                                onClick={toggleModal}>
                                Cancel
                            </button>
                        </div>
                    </main>
                    <div className="modal-close" onClick={toggleModal}>&times;</div>
                </article>
            </div >
        )
    }
};

export default Profile;