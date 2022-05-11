import { TouchableOpacityProps } from 'react-native'

import {
    Container,
    ButtonCard,
    TextCard
} from './styles'

interface ListCardProps extends TouchableOpacityProps {
    item: object;
}

export function ListCard({ item, ...rest }: ListCardProps) {
    return (
        <Container>
            <ButtonCard {...rest}>
                {Object.values(item).map((data, index) => (
                    <TextCard key={index}>
                        {index > 0 && data}
                    </TextCard>
                ))}
            </ButtonCard>
        </Container>
    )
}


