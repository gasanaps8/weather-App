import styled from 'styled-components';
import { Field, Form } from 'formik';
import { breakpoints } from '../styles/GlobalStyle';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
    align-items: center;
`;

export const LogoImg = styled.img`
    width: 120px;
    height: auto;
    cursor: pointer;
    display: block;
    margin: 0 auto 1rem auto;
`;

export const GeneralInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: center;
`

export const GeneralInfo = styled.h2`
    text-align: center;
    font-weight: 500;
    color: ${(props) => props.theme.colors.textPrimary};
    margin:0;
    margin-bottom:10px;
`;

export const Button = styled.button`
    display: block;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.colors.lightBlue};
    background-color: ${({theme}) => theme.colors.lighterBlue};
    color: ${({theme}) => theme.colors.textSecondary};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover:not(:disabled) {
        background: ${({theme}) => theme.colors.lighterBlue};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const FormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
    width: 70%;
    justify-content: center;
`;

export const InputRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

export const CityField = styled(Field)`
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    outline: none;
    min-width: 80px;
    max-width: 700px;
    width: 100%;

    &:focus {
        border-color: ${({theme}) => theme.colors.blue};
        box-shadow: 0 0 4px ${({theme}) => theme.colors.lightBlue};
    }
`;

export const SubmitButton = styled.button`
    padding: 9px 12px;
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.colors.lightBlue};
    background-color: ${({theme}) => theme.colors.lighterBlue};
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${({theme}) => theme.colors.lightBlue};
    }

    &:disabled {
        background-color: #888;
        cursor: not-allowed;
    }

    i {
        font-size: 1rem;
    }
`;

export const ErrorText = styled.p`
    color: #dc2626;
    font-size: 0.9rem;
    margin-top: 4px;
    margin-left: 5rem;
`;

export const Dropdown = styled.select`
    display: block;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.colors.lightBlue};
    background-color: ${({theme}) => theme.colors.lighterBlue};
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 1rem;
    cursor: pointer;
    position: relative;
`;

export const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 12px;
    margin: 1rem 0;
`;

export const MainFuncionalities = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: ${breakpoints.tablet}px) and (min-width: ${breakpoints.mobile}px) {
        flex-direction: row;
        gap:10px
    }
`;

