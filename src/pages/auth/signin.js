import { getCsrfToken, signIn } from 'next-auth/react';
import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/signin.module.css';

export default function SignIn({ csrfToken }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values) => {
    setLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      username: values.username,
      password: values.password,
    });

    setLoading(false);

    if (result.error) {
      message.error(result.error);
    } else {
      message.success('Signed in successfully');
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-wrapper']}>
        <Form
          onFinish={handleSubmit}
          className={styles.form}
        >
          <Form.Item>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input name="username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password name="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}