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

    isValid(): boolean
    {
        return this.birthYear !== undefined
            && this.issueYear !== undefined
            && this.expirationYear !== undefined
            && this.height !== undefined
            && this.hairColor !== undefined
            && this.eyeColor !== undefined
            && this.passportId !== undefined;
    }
}

function countValidPassports( input: string ): number
{
    const lines = input.split( '\n' );
    let passport = new Passport();
    let numValidPassports = 0;

    lines.forEach( ( line, iLine, lines ) =>
    {
        iLine === lines.length - 1
        if ( line === '' )
        {
            numValidPassports += passport.isValid() ? 1 : 0;
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
            numValidPassports += passport.isValid() ? 1 : 0;
            return;
        }
    } );

    return numValidPassports;
}

export function problem4_part1( input: string ): number
{
    return countValidPassports( input );
}