import { inRange } from "../tools";

const validEyeColors: Set<string> = new Set( [
    'amb',
    'blu',
    'brn',
    'gry',
    'grn',
    'hzl',
    'oth'
] );

class Passport
{
    birthYear: string;
    issueYear: string;
    expirationYear: string;
    height: string;
    hairColor: string;
    eyeColor: string;
    passportId: string;
    // countryId: string;

    private heightIsValid(): boolean
    {
        const match = /^(\d+)(cm|in)$/.exec( this.height );
        if ( !match )
            return false;

        const value = match[1]
        const units = match[2];
        if ( units === 'cm' )
            return inRange( parseInt( value ), 150, 193 );
        if ( units === 'in' )
            return inRange( parseInt( value ), 59, 76 )
        return false;
    }

    isKindaValid(): boolean
    {
        return this.birthYear !== undefined
            && this.issueYear !== undefined
            && this.expirationYear !== undefined
            && this.height !== undefined
            && this.hairColor !== undefined
            && this.eyeColor !== undefined
            && this.passportId !== undefined;
    }

    isStrictlyValid(): boolean
    {
        return this.isKindaValid()
            && inRange( parseInt( this.birthYear ), 1920, 2002 )
            && inRange( parseInt( this.issueYear ), 2010, 2020 )
            && inRange( parseInt( this.expirationYear ), 2020, 2030 )
            && this.heightIsValid()
            && /^#(([0-9])|([a-f])){6}$/.test( this.hairColor )
            && validEyeColors.has( this.eyeColor )
            && /^\d{9}$/.test( this.passportId );
    }
}

function countValidPassports( input: string, strict: boolean ): number
{
    const lines = input.split( '\n' );
    let passport = new Passport();
    let numValidPassports = 0;

    lines.forEach( ( line, iLine, lines ) =>
    {
        iLine === lines.length - 1
        if ( line === '' )
        {
            numValidPassports += ( strict ? passport.isStrictlyValid() : passport.isKindaValid() ) ? 1 : 0;
            passport = new Passport();
            return;
        }
        if ( passport.birthYear === undefined )
        {
            const match = /byr:([^\s]+)/.exec( line );
            passport.birthYear = match ? match[1] : undefined;
        }
        if ( passport.issueYear === undefined )
        {
            const match = /iyr:([^\s]+)/.exec( line );
            passport.issueYear = match ? match[1] : undefined;
        }
        if ( passport.expirationYear === undefined )
        {
            const match = /eyr:([^\s]+)/.exec( line );
            passport.expirationYear = match ? match[1] : undefined;
        }
        if ( passport.height === undefined )
        {
            const match = /hgt:([^\s]+)/.exec( line );
            passport.height = match ? match[1] : undefined;
        }
        if ( passport.hairColor === undefined )
        {
            const match = /hcl:([^\s]+)/.exec( line );
            passport.hairColor = match ? match[1] : undefined;
        }
        if ( passport.eyeColor === undefined )
        {
            const match = /ecl:([^\s]+)/.exec( line );
            passport.eyeColor = match ? match[1] : undefined;
        }
        if ( passport.passportId === undefined )
        {
            const match = /pid:([^\s]+)/.exec( line );
            passport.passportId = match ? match[1] : undefined;
        }
        // if ( passport.countryId === undefined )
        // {
        //     const match = /cid:([^\s]+)/.exec( line );
        //     passport.countryId = match ? match[1] : undefined;
        // }

        if ( iLine === lines.length - 1 )
        {
            numValidPassports += ( strict ? passport.isStrictlyValid() : passport.isKindaValid() ) ? 1 : 0;
            return;
        }
    } );

    return numValidPassports;
}

export function problem4_part1( input: string ): number
{
    return countValidPassports( input, false );
}

export function problem4_part2( input: string ): number
{
    return countValidPassports( input, true );
}