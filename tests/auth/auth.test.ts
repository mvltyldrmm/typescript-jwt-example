import AuthServices from '../../source/services/auth/auth.index';


describe('Testing auth login', () => {

  test('Wrong password/email login.', async () => {
    expect(await AuthServices.AuthLogin('mevlut053@icloud.com', '1232456')).toBe(false);
  });

  test("Sucess password/email", async () => {
    expect(await AuthServices.AuthLogin('mevlut053@icloud.com', '123456')).toMatch('ey');
  })

  test("Wrong token", async () => {
    expect(await AuthServices.AuthVerify('')).toBe(false);
  })

  test('Success token', async () => {
    const token: any = await AuthServices.AuthLogin('mevlut053@icloud.com', '123456')
    expect(await AuthServices.AuthVerify(token)).toMatchObject({ "email": "mevlut053@icloud.com" });
  })

  test('Success Refresh Token', async () => {
    const token: any = await AuthServices.AuthLogin('mevlut053@icloud.com', '123456')
    expect(await AuthServices.AuthRefreshToken('mevlut053@icloud.com', token)).toMatch('ey');
  })

  test('Wrong Refresh Token', async () => {
    const token: any = await AuthServices.AuthLogin('mevlut053@icloud.com', '123456')
    expect(await AuthServices.AuthRefreshToken('testmail@mail.com', token)).toBe(false);
  })

});