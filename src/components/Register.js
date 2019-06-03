import React from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Row,
  Col,
  Spin,
  message
} from 'antd';


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      loading: false,
      form: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });

        const form = [];
        // push form fields into array
        for (var key in values) {
          form.push(values[key]);
        };
        // now push to state
        this.setState({ form });

        setTimeout(() => {
          this.setState({ loading: false });
          message.success('Form uploaded successfully');
        }, 1000);

      }
    });
  }

  handleConfirmBlur = e => {
     const value = e.target.value;
     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
   };

   validateToNextPassword = (rule, value, callback) => {
     const form = this.props.form;
     if (value && this.state.confirmDirty) {
       form.validateFields(['confirm'], { force: true });
     }
     callback();
   };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
          xs: { span: 24},
          sm: { span: 8},
          md: { span: 8}
      },
      wrapperCol: {
        xs: { span: 24},
        sm: { span: 14},
        md: { span: 14}
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const { loading } = this.state;

    return(
      <div className="App">
        <Spin spinning={loading}>
          <div className='pageheader' style={{ textAlign: 'center'}}>
            <Row type='flex' justify='center'>
              <Col span={24}>
                <h1>Create Account</h1>
              </Col>
            </Row>
            <Row type='flex' justify='space-around'>
              <Col span={6}><Button type='primary' shape='circle' icon='twitter'/></Col>
              <Col span={6} offset={2}><Button type='primary' shape='circle' icon='google'/></Col>
              <Col span={6} offset={2}><Button type='primary' shape='circle' icon='github'/></Col>
            </Row> <br/>
            <Row type='flex' justify='center'>
              <Col span={24}>
              <p>or use your email for registration</p>
              </Col>
            </Row>
          </div>
          <Row>
            <Col span={24}>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    rules: [{required: true, message: 'Please input your name'}]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Surname">
                  {getFieldDecorator('surname', {
                    rules: [{required: true, message: 'Please input your surname'}]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Age">
                  {getFieldDecorator('age', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your surname'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="E-mail">
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail'
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                  })(
                    <Checkbox>
                      I have read the <a href="/">agreement</a>
                    </Checkbox>,
                  )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}

const Register = Form.create({ name: 'register' })(RegistrationForm);

export default Register;
