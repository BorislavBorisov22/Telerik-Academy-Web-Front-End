function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!',
        INVALID_ALIGNMENT: 'Alignment must be good, neutral or evil!'
    };

    const validator = {
        validateNumberRange: function(x, min, max, message) {
            if (typeof x !== 'number' || x < min || x > max) {
                throw Error(message);
            }
        },
        validateString: function(x, message) {
            if (typeof x !== 'string') {
                throw Error(message);
            }
        },
        validateName: function(x) {
            this.validateString(x, ERROR_MESSAGES.INVALID_NAME_TYPE);
            this.validateNumberRange(x.length, 2, 20, ERROR_MESSAGES.INVALID_NAME_LENGTH);

            if (!x.match(/^[a-zA-Z ]+$/)) {
                throw Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }
        },
        validateEffect: function(x) {
            if (typeof x !== 'function' || x.length !== 1) {
                throw Error(ERROR_MESSAGES.INVALID_EFFECT);
            }
        },
        validateAlignment: function(x) {
            let validAlignments = 'good, neutral, evil'.split(', ');

            if (validAlignments.indexOf(x) < 0) {
                throw Error(ERROR_MESSAGES.INVALID_ALIGNMENT);
            }
        },
        validatePositiveNumber: function(x, message) {
            if (typeof x !== 'number' || x <= 0) {
                throw Error(message);
            }
        },
        validatePositiveIntegerNumber: function(x, message) {
            if ((x | 0) !== x) {
                throw Error(message);
            }

            this.validatePositiveNumber(x, message);
        },
        validateCount: function(x, message) {
            if ((typeof x !== 'number') || (x < 0) || ((x | 0) !== x)) {
                throw Error(message);
            }
        }
    };

    const nextId = (function() {
        let id = 0;

        return function() {
            id += 1;
            return id;
        };
    })();

    // your implementation goes here
    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }

        get name() {
            return this._name;
        }

        set name(x) {
            validator.validateName(x);
            this._name = x;
        }

        get manaCost() {
            return this._manaCost;
        }

        set manaCost(x) {
            validator.validatePositiveIntegerNumber(x, ERROR_MESSAGES.INVALID_MANA);
            this._manaCost = x;
        }

        get effect() {
            return this._effect;
        }

        set effect(x) {
            validator.validateEffect(x);
            this._effect = x;
        }
    }

    class Unit {
        constructor(name, alignment) {

            this.name = name;
            this.alignment = alignment;
        }

        get name() {
            return this._name;
        }

        set name(x) {
            validator.validateName(x);
            this._name = x;
        }

        get alignment() {
            return this._alignment;
        }

        set alignment(x) {
            validator.validateAlignment(x);
            this._alignment = x;
        }
    }

    class ArmyUnit extends Unit {
        constructor(name, alignment, damage, health, count, speed) {
            super(name, alignment);

            this._id = nextId();
            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
        }

        get speed() {
            return this._speed;
        }
        set speed(x) {
            // change from 100 to 99 if there is a problem with range
            validator.validateNumberRange(x, 1, 100, ERROR_MESSAGES.INVALID_SPEED);
            this._speed = x;
        }

        get count() {
            return this._count;
        }
        set count(x) {
            // might be a problem when x is exactly 0
            validator.validateCount(x, ERROR_MESSAGES.INVALID_COUNT);
            this._count = x;
        }

        get health() {
            return this._health;
        }
        set health(x) {
            // Migh be a problem when x is exactly 200, if there is chhange validation
            validator.validateNumberRange(x, 1, 200, ERROR_MESSAGES.INVALID_HEALTH);
            this._health = x;
        }

        get damage() {
            return this._damage;
        }
        set damage(x) {
            validator.validateNumberRange(x, 0, 100, ERROR_MESSAGES.INVALID_DAMAGE);
            this._damage = x;
        }

        get id() {
            return this._id;
        }
    }

    class Commander extends Unit {
        constructor(name, alignment, mana) {
            super(name, alignment);

            this.mana = mana;
            this._speelbook = [];
            this._army = [];
        }

        get army() {
            return this._army;
        }

        get spellbook() {
            return this._speelbook;
        }

        get mana() {
            return this._mana;
        }
        set mana(x) {
            validator.validatePositiveIntegerNumber(x, ERROR_MESSAGES.INVALID_MANA);
            this._mana = x;
        }
    }

    function isArmyUnitLikeObject(obj) {
        const validArmyUnit = battlemanager.getArmyUnit({
            name: 'Zerg',
            alignment: 'evil',
            damage: 50,
            speed: 40,
            health: 30,
            count: 100
        });

        try {
            validArmyUnit.health = obj.health;
            validArmyUnit.count = obj.count;
            validArmyUnit.damage = obj.damage;
        } catch (ex) {
            throw Error("Battle participants must be ArmyUnit-like!");
        }
    }

    const battleManagerData = {
        commanders: [],
        armyUnits: []
    };

    const battlemanager = {
        getCommander: function(name, alignment, mana) {
            return new Commander(name, alignment, mana);
        },
        getArmyUnit: function(options) {
            const unit = new ArmyUnit(options.name, options.alignment, options.damage, options.health, options.count, options.speed);
            battleManagerData.armyUnits.push(unit);
            return unit;
        },
        getSpell: function(name, manaCost, effect) {
            return new Spell(name, manaCost, effect);
        },
        addCommanders: function(...commanders) {
            battleManagerData.commanders.push(...commanders);
            return this;
        },
        addArmyUnitTo: function(commanderName, armyUnit) {
            const commander = battleManagerData.commanders.find(x => x.name === commanderName);
            commander.army.push(armyUnit);
            return this;
        },
        addSpellsTo: function(commanderName, ...spells) {
            const commander = battleManagerData.commanders.find(x => x.name === commanderName);

            spells.forEach(function(x) {
                try {
                    const speelToCreate = new Spell(x.name, x.manaCost, x.effect);
                } catch (ex) {
                    throw Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }
            });

            commander.spellbook.push(...spells);
            return this;
        },
        findCommanders: function(query) {
            let filteredCommanders = battleManagerData.commanders.slice();

            if (query.hasOwnProperty('name')) {
                filteredCommanders = filteredCommanders.filter(x => x.name === query.name);
            }

            if (query.hasOwnProperty('alignment')) {
                filteredCommanders = filteredCommanders.filter(x => x.alignment === query.alignment);
            }

            return filteredCommanders;
        },
        findArmyUnitById: function(id) {
            return battleManagerData.armyUnits.find(x => x.id === id);
        },
        findArmyUnits: function(query) {
            let units = battleManagerData.armyUnits.slice();

            if (query.hasOwnProperty('id')) {
                units = units.filter(x => x.id === query.id);
            }

            if (query.hasOwnProperty('name')) {
                units = units.filter(x => x.name === query.name);
            }

            if (query.hasOwnProperty('alignment')) {
                units = units.filter(x => x.alignment == query.alignment);
            }

            return units.sort(function(x, y) {
                const diffSpeeds = y.speed - x.speed;
                if (diffSpeeds === 0) {
                    return x.name.localeCompare(y.name);
                }

                return diffSpeeds;
            });
        },
        spellcast: function(casterName, spellName, targetUnitId) {
            const spellCaster = battleManagerData.commanders.find(x => x.name === casterName);

            if (spellCaster === undefined) {
                throw Error("Can't cast with non-existant commander " + casterName + "!");
            }

            const spellToApply = spellCaster.spellbook.find(x => x.name === spellName);

            if (spellToApply === undefined) {
                throw Error(casterName + " doesn't know " + spellName);
            }

            if (spellCaster.mana < spellToApply.manaCost) {
                throw Error("Not enough mana!");
            }

            const targetUnit = battleManagerData.armyUnits.find(x => x.id === targetUnitId);

            if (targetUnit === undefined) {
                throw Error("Target not found!");
            }

            spellToApply.effect(targetUnit);
            spellCaster.mana -= spellToApply.manaCost;

            return this;

        },
        battle: function(attacker, defender) {
            isArmyUnitLikeObject(attacker);
            isArmyUnitLikeObject(defender);

            const attackTotalDamage = attacker.damage * attacker.count;
            const defenderTotalHealth = defender.health * defender.count;

            let totalHealthAterAttack = defenderTotalHealth - attackTotalDamage;
            let countAfterAttack = totalHealthAterAttack / defender.health;
            countAfterAttack = Math.ceil(countAfterAttack);

            if (totalHealthAterAttack < 0) {
                totalHealthAterAttack = 0;
            }
            if (countAfterAttack < 0) {
                countAfterAttack = 0;
            }

            defender.health = totalHealthAterAttack / countAfterAttack;

            defender.count = countAfterAttack;

            return this;
        }
    };

    return battlemanager;
}
module.exports = solve;