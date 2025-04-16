import Image from 'next/image';

interface IconProps {
    width: number;
    height: number;
}

export const GoogleIcon = ({ width, height }: IconProps) => {
    return (
        <Image src='/images/googleIcon.png'
            alt='Google Icon'
            width={width} height={height} 
            className='bg-transparent'>
        </Image>
    )
}

export const LogoIcon = ({ width, height }: IconProps) => {
    return (
        <Image src='/images/logo/logoTr.png'
            alt='Logo'
            width={width} height={height} 
            className='bg-transparent'>
        </Image>
    )
}

export const AddIcon = ({ width, height }: IconProps) => {
    return (
        <Image src='/images/addIcon.png'
            alt='Add new'
            width={width} height={height} 
            className='bg-transparent filter brightness-0 invert'>
        </Image>
    )
}

export const ExitIcon = ({ width, height }: IconProps) => {
    return (
        <Image src='/images/exitIcon.png'
            alt='Logout'
            width={width} height={height} 
            className='bg-transparent filter brightness-0 invert'>
        </Image>
    )
}

export const HangerIcon = ({ width, height }: IconProps) => {
    return (
        <Image src='/images/hangerIcon.png'
            alt='Collection'
            width={width} height={height} 
            className='bg-transparent filter brightness-0 invert'>
        </Image>
    )
}

export const MenuIcon = ({ width, height }: IconProps) => {
    return (
        <Image src='/images/menuIcon.png'
            alt='Menu'
            width={width} height={height} 
            className='bg-transparent filter brightness-0 invert'>
        </Image>
    )
}

export const NextIcon = ({ width, height }: IconProps) => {
    return (
        <Image src='/images/nextIcon.png'
            alt='Next Image'
            width={width} height={height} 
            className='bg-transparent'>
        </Image>
    )
}

export const BackIcon = ({ width, height }: IconProps) => {
    return (
        <Image src='/images/backIcon.png'
            alt='Back Image'
            width={width} height={height} 
            className='bg-transparent'>
        </Image>
    )
}

