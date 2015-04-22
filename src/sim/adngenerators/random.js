ADNGenerators.random = function () {
    var adn = new ADN();

    adn.props["W1"] = true;
    adn.props["W2"] = true;
    adn.props["W1R"] = Math.random()*35 + 5; // 5 < . < 40
    adn.props["W2R"] = Math.random()*35 + 5;
    adn.props["W1A"] = Math.random()*4;
    adn.props["W2A"] = Math.random()*4;

    return adn;
};