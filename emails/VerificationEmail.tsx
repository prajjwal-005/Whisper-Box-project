import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
   <Html lang="en" dir="ltr">
  <Head>
    <title>Verify your email</title>
    <Font
      fontFamily="Roboto"
      fallbackFontFamily="Verdana"
      webFont={{
        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
        format: "woff2",
      }}
      fontWeight={400}
      fontStyle="normal"
    />
  </Head>

  <Preview>Your Whisper Box verification code is {otp}</Preview>

  <Section>
    <Row>
      <Heading as="h2">Hi {username},</Heading>
    </Row>

    <Row>
      <Text>
        Welcome to Whisper Box! Use the verification code below to confirm your
        email address:
      </Text>
    </Row>

    <Row>
      <Text style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "2px" }}>
        {otp}
      </Text>
    </Row>

    <Row>
      <Text>
        This code will expire soon. If you didn’t request this, you can safely
        ignore this email.
      </Text>
    </Row>

    <Row>
      <Text>
        Thanks, <br />
        Team Whisper Box
      </Text>
    </Row>
  </Section>
</Html>

  );
}