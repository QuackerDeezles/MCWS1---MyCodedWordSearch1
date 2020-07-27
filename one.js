          // Show the word in black on top of the line
          ctx.font = "20pt Courier";
          ctx.fillStyle = "#000000";
          var xVal = ((answers[i][1] % columnLength) + 1) * 30;
          var yVal = (parseInt(answers[i][1] / columnLength)+ 1) * 30;
          for (var j = 0; j < answers[i][0].length; j++) {
            var c = answers[i][0].charAt(j);
            ctx.fillText(c, xVal, yVal);
            switch (answers[i][3]) {
              case "N":
                yVal -= 30;
                break;
              case "NE":
                xVal += 30;
                yVal -= 30;
                break;
              case "E":
                xVal += 30;
                break;
              case "SE":
                xVal += 30;
                yVal += 30;
                break;
              case "S":
                yVal += 30;
                break;
              case "SW":
                xVal -= 30;
                yVal += 30;
                break;
              case "W":
                xVal -= 30;
                break;
              case "NW":
                xVal -= 30;
                yVal -= 30;
                break;
            }
