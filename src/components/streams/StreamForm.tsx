import React, {ComponentType}from 'react'
import {Field, reduxForm,  InjectedFormProps} from 'redux-form'


interface StreamCreateProps{
       onSubmit:(formValues:any) => void;
        
}

interface renderErrors {
        touched:boolean
        error:string
}

class StreamForm extends React.Component<StreamCreateProps & InjectedFormProps> {
   
   
        onSubmit = (formValues:any):void => {
               this.props.onSubmit(formValues)
                const Fields = document.querySelectorAll(".inputs")
                Fields.forEach(field => {
                        function clear(event:any) {
                                event.value = ""
                        }
                        clear(field)
                })
        }


        renderError({error, touched}:renderErrors):JSX.Element {
                if (touched && error) {
                        return (
                                <div className="ui error message">
                                        <div className="header">{error}</div>
                                </div>
                        )
                }
                else {
                        return <div></div>
                }
        }

        renderInput = (FormProps:{
           input:{}
           label:string
           meta:any
   }) => {
        const className:string = `field ${FormProps.meta.error && FormProps.meta.touched? 'error':''}`
        return (<div className={className}>
                <label htmlFor="">{FormProps.label}</label>
        <input className="inputs" {...FormProps.input} autoComplete="off"/>
                {this.renderError(FormProps.meta)}
        </div>)
    }

    render () {
        console.log(this.props.initialValues)
        return (
               <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field  name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
               </form>
)};
}

interface error {
        title: string
        description: string
}


const validate = (formValue:{title:string, description:string}) => {
        const errors:Partial<error> = {}
        if (!formValue.title) {
                errors.title = 'You must enter a title'
        }

        if (!formValue.description) {
                errors.description = 'You must enter a description'
        }
        return errors
}

const goodForm = reduxForm({
        form: 'streamForm', 
        validate:validate,
        enableReinitialize: true
})((StreamForm as unknown as ComponentType<InjectedFormProps<{ title: string; description: string; }, {}, string>>))
export default goodForm