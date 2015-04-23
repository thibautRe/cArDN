ADNGenerators.random = function () {
    var adn = new ADN();

    adn.props["W1"] = true;
    adn.props["W2"] = true;
    adn.props["W1R"] = Math.random()*30 + 15; // 5 < . < 40
    adn.props["W2R"] = Math.random()*30 + 15;
    adn.props["W1A"] = Math.random();
    adn.props["W2A"] = Math.random();
    adn.props["W1S"] = Math.random()*10 + 5;
    adn.props["W2S"] = Math.random()*10 + 5;
    adn.props["W1T"] = Math.random()*100000000 + 50000000;
    adn.props["W2T"] = Math.random()*100000000 + 50000000;

    return adn;
};