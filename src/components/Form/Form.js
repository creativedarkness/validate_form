import React, { Component } from 'react';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            nameValid: false,
            emailValid: false,
            canSubmit: false,
            submitted: false,
        }
    }

    updateValue = (props) => {
        // console.log(props.target.value);
        // console.log(props.target.id);
        this.setState({
            [props.target.id]: props.target.value
        },() => this.validate())
    }
    validate = (props) => {
        var tmpName;
        var tmpEmail;
        var tmpSubmit;
        var zachMadness = RegExp(`^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$`);
        console.log(this.state.name.length);
        tmpName = this.state.name.length < 8 ? false : true;
        tmpEmail = zachMadness.test(this.state.email);
        tmpSubmit = tmpName && tmpEmail ? true : false;

        console.log(tmpName);

        this.setState({
            nameValid: tmpName,
            emailValid: tmpEmail,
            canSubmit: tmpSubmit,
        });

    }

    submitForm = (props) => {
        props.preventDefault();
        this.setState({submitted: true});
    }

    render() {
        console.log(this.state);
        return (
            <div className="Form">
                <h1> Validated Form</h1>
                {!this.state.submitted ? 
                <div>
                <form onSubmit={this.submitForm}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" onChange={this.updateValue} id="name" />
                    {!this.state.nameValid ? <span>Please enter a name with atlest 8 characters</span> : null}
                    <br />

                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" onChange={this.updateValue} id="email" />
                    {!this.state.emailValid ? <span>Please enter a vaild email</span> : null}
                    <br />

                    <input type="submit" disabled={!this.state.canSubmit}/>
                </form>
                </div>
                :
                <div><h2>Thanks, I will now spam you to death</h2></div>
                }
            </div>
        );
    }
}

export default Form;
