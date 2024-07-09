import { render, screen } from '@testing-library/react'
import { Column } from '../components/Column'



describe("<Column />", () => {
    test("reder the Column componen", ()=> {

        const itemTest = {id:5,description:"taks five"}
        const columIdTest = 1

        render(<Column item={itemTest} columId={columIdTest}/>)

        const titleElemen = screen.getByText(/taks/i);
        const textoElemen = screen.getByText(/content/i);

        expect(titleElemen).toBeInTheDocument();
        expect(textoElemen).toBeInTheDocument();
    });
});