        var tier0 = ['Do you feel connected to the people around you?',
                    'How often do you express affection to loved ones?',
                    'Do you enjoy the outdoors?',
                    'On a scale of 1-10, rate your current happiness.',
                    'When was the last time you went for a walk?',
                    'Do you feel secure?',
                    'Do you enjoy being in large groups?',
                    'What makes you feel optimistic?'];
        var tier1 = ['When was the last time you called them?',
                    'Do you feel stressed or guilty at not having accomplished enough?',
                    'Do you take failure in stride?',
                    'Describe something you like.',
                    'Would you rather be in an enclosed space or an open field?',
                    'Is your phone charged?',
                    "Describe the latest email or text message you've received.",
                    'Have you ever told someone "not to take it out" on you?',
                    'What is your favorite news source?',
                    'Do you often think about humankind and its destiny?',
                    'Do you value justice higher than mercy?',
                    'Are your computer desktop and file system usually neat and orderly?',
                    'Are deadlines of relative, rather than absolute, importance to you?',
                    'No surprises is better than surprises. True or false.',
                    'What do you feel is the biggest problem in the world today?',
                    'What worries people the most?',
                    'In what aspect of life do you feel the most compromised?',
                    'Have you ever written a review on Yelp? If yes, why?',
                    'What concerns do you have in life that you would like to remedy? And what makes you feel that way?',
                    'Do you spend a lot of your free time learning about things which have absolutely no practical application?',
                    'Describe what this looks like to you: (8>/--<'];
        var tier2 = ['Walking under the shade of an old oak tree, what do you see?',
                    'Do you make an effort to look smart?',
                    'Do you worry about the NSA reading your email? If yes, how frequent is your worry?',
                    '"Remember those quiet evenings." Have you seen this before?',
                    'What conspiracy theories do you believe?',
                    'In your next birth, you would love to be:',
                    'How do you feel burdened?',
                    'Do you worry about your heroes?',
                    'What would your ideal phone case look like?',
                    'Are there perfect objects?',
                    'What is the average number of tabs you have open at any given time?',
                    'Have the implications of climate change ever kept you up at night?',
                    "Do you use others' accounts on media streaming services?",
                    'Have you ever said a word and, immediately after, questioned whether it was actually a word at all?',
                    'Why are manhole covers round?',
                    'If you found yourself in a position of absolute power, would you set limitations on exercising it?',
                    'Do you feel ownership of your body?',
                    'Does your right hand look unusual now?',
                    'Is time running out, slowing down, or changed completely?',
                    'How many piano tuners are there in the entire world?',
                    'Have you ever wished you were an inanimate object?',
                    'What do you think this is?',
                    'Do you feel confident in your answers here?',
                    'Would you identify as a hunter, gatherer, or other? If other, please specify.',
                    'How often do you change your sheets?',
                    'To what degree do you think your local geography influences your aesthetic preferences?'];
        var numOfQuestions = 0;
        var tierArray = [tier0, tier1, tier2];
        var currentArray = tier0;
        var arrayItem = '';
        var counter = 0;
        var position = 0;

        var base = new Firebase('https://questi-onl.firebaseio.com/');


        function questionLength() {
            for(var i=0; i < tierArray.length; i++) {
                numOfQuestions +=  tierArray[i].length;
            }
        }

        function rand(min, max) {
            return min + Math.random() * (max - min);
        }

        function get_random_color() {
            var h = 360; // rand(1, 360);
            var s = 0; // rand(0, 50);
            var l = rand(50, 100);
            return 'hsl(' + h + ',' + s + '%,' + l + '%)';
        }

        function arrayShuffle () {
           var i = this.length, j, temp;
           if ( i === 0 ) return false;
           while ( --i ) {
              j = Math.floor( Math.random() * ( i + 1 ) );
              temp = this[i];
              this[i] = this[j]; 
              this[j] = temp;
           }
        }

        Array.prototype.shuffle = arrayShuffle;
        questionLength();
        currentArray.shuffle();
        document.getElementById('results').innerHTML = '0/' + numOfQuestions;

        function submitted() {
            if(counter < tierArray.length) {
                document.body.style.backgroundColor = get_random_color();
                position++;
                base.push({Answer: document.getElementById("answer").value, Question : arrayItem});
                // Note: if question is blank in base, it's the first 'How are you?'
                document.getElementById("answer").value = '';
                arrayItem = currentArray.pop();
                document.getElementById('question').innerHTML = arrayItem;
                questionsCount();

                var level = counter + 1;
                document.getElementById('level').innerHTML = "Level " + level;
            }
            if (counter > tierArray.length - 1) {
                document.getElementById('interaction').innerHTML = "<b>Congratulations!</b><br><br><br><a href='questi-onl-export.json' target='_blank'>View users' results</a><br><br>Coming soon in v0.2.2."; // get_string();
            }
            if(currentArray.length == 0 && counter < tierArray.length){
                counter++;
                currentArray = tierArray[counter];
                currentArray.shuffle();
            }
        }

        function questionsCount() {
            document.getElementById('results').innerHTML = position + '/' + numOfQuestions;
            // '<a href="#" target="_blank">View real-time results (COMING SOON!)</a>';
        }
